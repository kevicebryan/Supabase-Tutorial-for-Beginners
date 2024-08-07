import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter((smoothie) => smoothie.id !== id);
    });
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, err } = await supabase
        .from("smoothies")
        .select("")
        .order(orderBy, { ascending: true });
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
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError.message}</p>}
      <div className="smoothies">
        {/* order-by buttons */}
        <div className="order-by">
          <p>Order by:</p>
          <button onClick={() => setOrderBy("created_at")}>Created At</button>
          <button onClick={() => setOrderBy("title")}>Title</button>
          <button onClick={() => setOrderBy("rating")}>Rating</button>
        </div>
        <div className="smoothie-grid">
          {smoothies &&
            smoothies.map((smoothie) => {
              return (
                <SmoothieCard
                  key={smoothie.id}
                  smoothie={smoothie}
                  onDelete={handleDelete}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
