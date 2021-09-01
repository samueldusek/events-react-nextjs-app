import { getAllEvents } from "../../helpers/api-utils";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import Head from "next/head";
import { Fragment } from "react";

function AllEventsPage({ events }) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events!" />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
