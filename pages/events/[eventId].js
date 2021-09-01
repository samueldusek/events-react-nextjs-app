import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Head from "next/head";

function EventDetailPage({ event }) {
  if (!event) {
    return (
      <div className="center">
        <p>Loading..</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        location={event.location}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const eventsIds = events.map((event) => event.id);
  const paths = eventsIds.map((id) => ({ params: { eventId: id } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { eventId } = context.params;
  const event = await getEventById(eventId);
  return {
    props: {
      event: event,
    },
    revalidate: 1800,
  };
}

export default EventDetailPage;
