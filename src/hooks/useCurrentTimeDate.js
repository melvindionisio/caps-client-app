const useCurrentTimeDate = () => {
   const today = new Date();
   let hours = today.getHours();
   let minutes = today.getMinutes();
   const dayTime = hours >= 12 ? "PM" : "AM";
   hours = hours % 12;
   hours = hours ? hours : 12;
   minutes = minutes < 10 ? "0" + minutes : minutes;

   const monthsName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ];

   let time = `${hours}:${minutes} ${dayTime}`;
   let date = `${
      monthsName[today.getMonth()]
   } ${today.getDate()}, ${today.getFullYear()}`;

   return `${time} ${date}`;
};

export default useCurrentTimeDate;
