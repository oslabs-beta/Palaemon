import * as React from 'react';
import { EventProps } from '../Types';

const Events = (props: EventProps): JSX.Element => {

    const handleOnClick = () => {
    }

    return(
        <div id='container-event' className='container events right-side'>
            <nav id='container-select' className='container events'>
                <select className='event-selector' id='selector-log-type' name="log-type" defaultValue={'events'}>
                    <option value="events">Event</option>
                    <option value="info">Logs</option>
                </select>
                <select className='event-selector' id='selector-severity' name="severity" defaultValue={'default'}>
                    <option value="default">Default</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                    <option value="critical">Critical</option>
                    <option value="alert">Alert</option>
                    <option value="emergency">Emergency</option>
                    <option value="debug">Debug</option>
                </select>
                <button type='button' onClick={handleOnClick}>Click me</button>
            </nav>
            <div id='container-event-logs' className='container events'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum vitae nihil dolore! Repellendus, hic! Earum, officia aspernatur! Cum sint, quos autem, accusantium cumque, laboriosam natus consectetur repellat necessitatibus qui nemo.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam sed placeat reiciendis tenetur unde illo, nam, dolor odio quae voluptatibus at eum perspiciatis nulla quas praesentium consequatur impedit voluptatem veniam!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi obcaecati vitae consequatur natus nobis, perspiciatis alias accusantium quo aut nihil molestias officiis inventore repellat molestiae eos suscipit beatae impedit quis.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam laborum iure perferendis ipsam at ad hic nesciunt veniam maiores delectus, dolorum suscipit modi deserunt corporis accusantium minus ut dolor praesentium.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque odit tempora architecto molestias, officia, atque autem sapiente, accusamus exercitationem eius eaque minus ratione velit laborum consequuntur! Maxime officiis veritatis magni!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas maxime facere similique cumque illum. Aliquam aspernatur maiores aliquid repellendus, numquam nam quae labore ut, ex obcaecati veniam quas voluptatem. Veritatis!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum vitae nihil dolore! Repellendus, hic! Earum, officia aspernatur! Cum sint, quos autem, accusantium cumque, laboriosam natus consectetur repellat necessitatibus qui nemo.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam sed placeat reiciendis tenetur unde illo, nam, dolor odio quae voluptatibus at eum perspiciatis nulla quas praesentium consequatur impedit voluptatem veniam!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi obcaecati vitae consequatur natus nobis, perspiciatis alias accusantium quo aut nihil molestias officiis inventore repellat molestiae eos suscipit beatae impedit quis.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam laborum iure perferendis ipsam at ad hic nesciunt veniam maiores delectus, dolorum suscipit modi deserunt corporis accusantium minus ut dolor praesentium.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque odit tempora architecto molestias, officia, atque autem sapiente, accusamus exercitationem eius eaque minus ratione velit laborum consequuntur! Maxime officiis veritatis magni!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas maxime facere similique cumque illum. Aliquam aspernatur maiores aliquid repellendus, numquam nam quae labore ut, ex obcaecati veniam quas voluptatem. Veritatis!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum vitae nihil dolore! Repellendus, hic! Earum, officia aspernatur! Cum sint, quos autem, accusantium cumque, laboriosam natus consectetur repellat necessitatibus qui nemo.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam sed placeat reiciendis tenetur unde illo, nam, dolor odio quae voluptatibus at eum perspiciatis nulla quas praesentium consequatur impedit voluptatem veniam!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi obcaecati vitae consequatur natus nobis, perspiciatis alias accusantium quo aut nihil molestias officiis inventore repellat molestiae eos suscipit beatae impedit quis.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam laborum iure perferendis ipsam at ad hic nesciunt veniam maiores delectus, dolorum suscipit modi deserunt corporis accusantium minus ut dolor praesentium.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque odit tempora architecto molestias, officia, atque autem sapiente, accusamus exercitationem eius eaque minus ratione velit laborum consequuntur! Maxime officiis veritatis magni!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas maxime facere similique cumque illum. Aliquam aspernatur maiores aliquid repellendus, numquam nam quae labore ut, ex obcaecati veniam quas voluptatem. Veritatis!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum vitae nihil dolore! Repellendus, hic! Earum, officia aspernatur! Cum sint, quos autem, accusantium cumque, laboriosam natus consectetur repellat necessitatibus qui nemo.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam sed placeat reiciendis tenetur unde illo, nam, dolor odio quae voluptatibus at eum perspiciatis nulla quas praesentium consequatur impedit voluptatem veniam!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi obcaecati vitae consequatur natus nobis, perspiciatis alias accusantium quo aut nihil molestias officiis inventore repellat molestiae eos suscipit beatae impedit quis.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam laborum iure perferendis ipsam at ad hic nesciunt veniam maiores delectus, dolorum suscipit modi deserunt corporis accusantium minus ut dolor praesentium.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque odit tempora architecto molestias, officia, atque autem sapiente, accusamus exercitationem eius eaque minus ratione velit laborum consequuntur! Maxime officiis veritatis magni!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas maxime facere similique cumque illum. Aliquam aspernatur maiores aliquid repellendus, numquam nam quae labore ut, ex obcaecati veniam quas voluptatem. Veritatis!

            </div>
        </div>
    )
}

export default Events