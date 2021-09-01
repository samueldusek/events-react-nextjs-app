import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import ResultsTile from "../../components/event-detail/results-title";
import { getFilteredEvents } from "../../helpers/api-utils";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";
import useSWR from "swr";

function FilteredEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState();

  const filterData = router.query.slug;

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    "https://nextjs-course-f0037-default-rtdb.europe-west1.firebasedatabase.app/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events.`} />
    </Head>
  );

  if (!events) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading..</p>
      </Fragment>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter, adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filterDate = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTile date={filterDate} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth > 12 ||
//     numMonth < 1
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//     };
//   }

//   const events = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: events,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
