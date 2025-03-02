import moment from "moment";

export enum StreakState {
  COMPLETED = "COMPLETED",
  AT_RISK = "AT_RISK",
  SAVED = "SAVED",
  INCOMPLETE = "INCOMPLETE",
}

interface Day {
  date: string;
  activities: number;
  state:
    | StreakState.COMPLETED
    | StreakState.AT_RISK
    | StreakState.SAVED
    | StreakState.INCOMPLETE;
}

export interface StreakResponse {
  activitiesToday: number;
  total: number;
  days: Day[] | null;
}

const StreakCard = ({ days }: { days: Day[] | null }) => {
  const dateToday = moment().format("YYYY-MM-DD");

  return (
    <div className="flex flex-row space-x-4">
      {days?.map((day, index) => (
        <div key={index} className="flex flex-col items-center">
          {(day.state === StreakState.COMPLETED ||
            day.state === StreakState.SAVED) && (
            <div
              className={`w-8 h-8 ${
                moment(day.date).format("YYYY-MM-DD") === dateToday
                  ? "bg-green-600"
                  : "bg-green-200"
              } rounded-full flex items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          {(day.state === StreakState.AT_RISK ||
            (day.state === StreakState.INCOMPLETE &&
              moment(day.date).format("YYYY-MM-DD") < dateToday)) && (
            <div
              className={`w-8 h-8 ${
                new Date(day.date).getTime() === new Date().getTime()
                  ? "bg-red-600"
                  : "bg-red-200"
              } rounded-full flex items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1zm-1-4a1 1 0 112 0v2a1 1 0 11-2 0V5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          {(day.state === StreakState.INCOMPLETE && moment(day.date).format("YYYY-MM-DD") >= dateToday) && (
            <div
              className={`w-8 h-8 ${
                moment(day.date).format("YYYY-MM-DD") === dateToday
                  ? "bg-green-600"
                  : "bg-green-200"
              } rounded-full flex items-center justify-center`}
            ></div>
          )}
          <span
            className={`font-bold mb-2 mt-2 ${
              moment(day.date).format("YYYY-MM-DD") === dateToday
                ? "text-gray-600"
                : "text-gray-300"
            }`}
          >
            {moment(day.date).format("ddd")}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StreakCard;
