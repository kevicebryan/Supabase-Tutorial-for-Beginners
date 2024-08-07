import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  const handleDelete = (id) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter((smoothie) => smoothie.id !== id);
    });
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, err } = await supabase.from("smoothies").select("");
      if (err) {
        setFetchError("Could not fetch smoothies");
        setSmoothies(null);
        console.log(err);
      }
      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };
    fetchSmoothies();
  }, []);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError.message}</p>}
      {smoothies &&
        smoothies.map((smoothie) => {
          return (
            <div className="smoothies">
              <div className="smoothie-grid">
                {/* order-by buttons */}
                <SmoothieCard
                  key={smoothie.id}
                  smoothie={smoothie}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
