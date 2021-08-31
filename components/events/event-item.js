import Link from 'next/link'

function EventItem(props) {

    const {title, image, date, location, id} = props;

  return <li>
      <img src={} alt="" />
      <div>
          <div>
              <h2>TITLE</h2>
              <div>
                  <time>DATE</time>
              </div>
              <div>
                  <address>ADRESS</address>
              </div>
          </div>
          <div>
            <Link href="">Event Details</Link>
          </div>
      </div>
  </li>;
}

export default EventItem;
