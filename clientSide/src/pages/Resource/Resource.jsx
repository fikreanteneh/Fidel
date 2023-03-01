import React, {useState} from "react";
import { NavBar } from "../../components/cexporter";
import "./Resource.css";
import { ResourceData } from '../ResourceData/ResourceData';
import { ResourceMenu } from "./../ResourceMenu/ResourceMenu";
import { MainResource } from '../MainResource/MainResource';


const Resource = () => {
  const [activeItem, setActiveItem] = useState(ResourceData[0].subNav[0])
  return (
    <div>
      <NavBar />
            <main className='resource__main'>
                <div className='resource__nav'>
                    {ResourceData.map((item, index) => {
                        return (
                            <div className="resource__title">
                                <ResourceMenu  setActiveItem={setActiveItem}  item={item} key={index} />
                            </div>
                        )
                    })}
                </div>

                <MainResource content={activeItem}/>
            </main>
      
    </div>
  );
};

export default Resource;
