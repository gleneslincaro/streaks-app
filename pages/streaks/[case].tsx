import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import StreakCard, { StreakResponse, StreakState } from "../../components/StreakCard";
import styles from "../../styles/streaks.module.css";
import "../../styles/globals.css";
import moment from "moment";

const StreakPage = () => {
  const router = useRouter();
  const { case: caseId } = router.query;
  const [streakData, setStreakData] = useState<StreakResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!caseId) return;

    const fetchStreakData = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_HOST}/streaks/${caseId}`
        );
        setStreakData(response.data);
      } catch (error) {
        console.error("Error fetching streak data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStreakData();
  }, [caseId]);

  const getStreakMessage = useCallback((streakData: StreakResponse | null) => {
    let message = "You don't have a streak!";
    if (!streakData) {
      return message;
    }

    const { total, days } = streakData;

    if (total > 1) {
      return `Your streak is ${total} days!`;
    } else {
      if (days) {
        const dateToday = moment().format("YYYY-MM-DD");
        days.forEach((day, index) => {
          const { state, activities } = day;
          const streakDate = moment(day.date).format("YYYY-MM-DD");
          if (streakDate > dateToday) {
            return;
          }
          if (streakDate === dateToday && index > 0) {
            if (days[index - 1].state === StreakState.AT_RISK && activities === 0) {
              message = `Your streak is at risk!`;
            } else if (days[index - 1].state === StreakState.SAVED && state === StreakState.INCOMPLETE && activities > 0) {
              message = `You can still save your streak!`;
            }
          }
        });
      }
      return message;
    }
  }, []);

  if (loading) return <p>Loading streak data...</p>;

  return (
    <div>
      <div
        className={`${styles.streakContainer} flex justify-center items-center h-screen block bg-yellow-50`}
      >
        <div className={`${styles.streakDetails}`}>
          <div>
            <h1 className="text-3xl">
            {getStreakMessage(streakData)}
            </h1>
          </div>
          <StreakCard days={streakData?.days} />
        </div>
      </div>
    </div>
  );
};

export default StreakPage;
