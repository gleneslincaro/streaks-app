import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import StreakCard, { StreakResponse } from "../../components/StreakCard";
import styles from "../../styles/streaks.module.css";
import "../../styles/globals.css";

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

  if (loading) return <p>Loading streak data...</p>;

  return (
    <div>
      <div
        className={`${styles.streakContainer} flex justify-center items-center h-screen block bg-yellow-50`}
      >
        <div className={`${styles.streakDetails}`}>
          <div>
            <h1 className="text-4xl">
              {streakData?.total && streakData.total > 1
                ? `Your streak is ${streakData?.total} days!`
                : "You don't have a streak yet!"}
            </h1>
          </div>
          <StreakCard days={streakData?.days} />
        </div>
      </div>
    </div>
  );
};

export default StreakPage;
