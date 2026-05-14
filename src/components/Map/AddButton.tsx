import { useFetcher } from "react-router-dom";
import { useState } from "react";

export function AddButton({ vehicleId }: { vehicleId: number }) {
  const fetcher = useFetcher();
  const [added, setAdded] = useState(false);

  function handleClick() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }return (
    <fetcher.Form method="post" action="/cart/add" onSubmit={handleClick}>
      <input type="hidden" name="vehicleId" value={vehicleId} />
      <input type="hidden" name="distance" value="40" />
      <button type="submit" className={added ? "btn-added" : "btn-add"}>
        {added ? "✓ Ajouté" : "+ Ajouter"}
      </button>
    </fetcher.Form>
  );
}