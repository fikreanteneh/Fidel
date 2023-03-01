import React from 'react'
import "./MainResource.css"  

export const MainResource = ({content}) => {
  console.log(content)

  function ResourceList(props) {
    return (
      <div className='resource-container'>
        <div className='resources'>
          <i class="fa fa-book" aria-hidden="true"></i>
        </div>
        <p className='resource-grade'>{content.grade}</p>
        <p className='resource-title'>{content.title}</p>
       
        <a href={props.resource} target='blank'> <button className='watch-now-btn'>Watch now</button></a>
      </div>
    )
  }

  return (
    <div>
   
   {content.resource ? 
   
   <div>
   {content.resource.map((item, index)=> <ResourceList key={index} resource={item}/>)}
   </div>
   :
   
   ""} 
    </div>
    // <div className='main__resource'>
    //   <div className='resource__grid'>
    //     <div className='grid__item'>
    //       <div className='icon'>
    //         <i className="fa-brands fa-youtube"></i>
    //       </div>
    //       <p>{content[0]}</p>
    //     </div>
    //     <div className='grid__item'>
    //       <div className='icon'>
    //         <i className="fa-brands fa-youtube"></i>
    //       </div>
    //       <p>{content[0]}</p>
    //     </div>
    //     <div className='grid__item'>
    //       <div className='icon'>
    //         <i className="fa-brands fa-youtube"></i>
    //       </div>
    //       <p>{content[0]}</p>
    //     </div>
    //     <div className='grid__item'>
    //       <div className='icon'>
    //         <i className="fa-brands fa-youtube"></i>
    //       </div>
    //       <p>{content[0]}</p>
    //     </div>
    //   </div>
    // </div>
  )
}
