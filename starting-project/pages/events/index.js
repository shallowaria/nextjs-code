import { useRouter } from "next/router";
import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  function handleFindEvents(year, mouth) {
    const fullPath = `/events/${year}/${mouth}`;

    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={handleFindEvents} />
      <EventList items={events} />
    </>
  );
}

export default AllEventsPage;
