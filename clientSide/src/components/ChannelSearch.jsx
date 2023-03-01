// import React, { useState, useEffect } from "react";
// import { useChatContext } from "stream-chat-react";

// import { SearchIcon } from "../assets/SearchIcon";

// const ChannelSearch = () => {
//   const [query, setQuery] = useState("");
//   const [Loading, setLoading] = useState(false);

//   const getChannels = async (text) => {
//     try {
//       //! fetch channels here
//       //! fetch channels here
//     } catch (error) {
//       setQuery("");
//     }
//   };

//   const onSearch = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setQuery(e.target.value);
//     getChannels(e.target.value);
//   };

//   return (
//     <div className="channel-search__container">
//       <div className="channel-search__input__wrapper">
//         <div className="channel-serach__input__icon">
//           <SearchIcon />
//         </div>
//         <input
//           className="channel-search__input__text"
//           placeholder="Search"
//           type="text"
//           value={query}
//           onChange={onSearch}
//         />
//       </div>
//     </div>
//   );
// };

// export default ChannelSearch;
