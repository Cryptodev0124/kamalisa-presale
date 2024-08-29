import FlipCountdown from "@rumess/react-flip-countdown";

export default function Timer() {
    const endDate = new Date('2024-09-05T00:00:00');
    const startDate = new Date('2024-09-05T00:00:00');
    const currentDate = Date.now();
    let date;
    let isValid;
    if (currentDate < startDate.getTime()) {
        date = startDate;
        isValid = true;
    } else if (currentDate >= startDate.getTime() && currentDate <= endDate.getTime()){
        date = endDate;
        isValid = true;
    } else if (currentDate > endDate.getTime()) {
        date = 0;
        isValid = false;
    }
    return (isValid ?
        <FlipCountdown
            hideYear
            hideMonth
            theme="dark"
            titlePosition='bottom'
            dayTitle='Days'
            hourTitle='Hours'
            minuteTitle='Min'
            secondTitle='Sec'
            endAt={date.toString()}
        /> : <div className="emptyDiv"></div>
    );
};