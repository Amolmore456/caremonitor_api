
function groupDataBy15Min(data) {
    const groupedData = [];
    const interval = 15; // interval in minutes
    let currentIntervalStart = new Date(data[0].on_date);
    let currentIntervalEnd = new Date(currentIntervalStart);
    currentIntervalEnd.setMinutes(currentIntervalEnd.getMinutes() + interval);
  
    // loop through each item in the data array
    data.forEach((item) => {
      const itemDate = new Date(item.on_date);
      
      // check if the item is within the current interval
      if (itemDate >= currentIntervalStart && itemDate < currentIntervalEnd) {
        // add the item to the current interval array
        if (!groupedData.length) {
          groupedData.push([]);
        }
        groupedData[groupedData.length - 1].push(item);
      } else {
        // create a new interval array and add the item to it
        currentIntervalStart = new Date(currentIntervalEnd);
        currentIntervalEnd.setMinutes(currentIntervalEnd.getMinutes() + interval);
        groupedData.push([item]);
      }
    });

    const result =  groupedData.map(subArr => {
    
        return {
            from_date: new Date(subArr[0].on_date).toISOString(),
            to_date: new Date(subArr[subArr.length - 1].on_date).toISOString(),
            measurement: {
                min: subArr.reduce((r, b) => Math.min(r, b.measurement), Number.POSITIVE_INFINITY),
                max: subArr.reduce((r, b) => Math.max(r, b.measurement), Number.NEGATIVE_INFINITY)
    
            }
        }
    });
    return result;
  }
  

  export default groupDataBy15Min