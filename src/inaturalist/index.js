export async function getObservations() {
  const res = await fetch(
    "https://api.inaturalist.org/v1/observations?nelat=41.450501&nelng=2.133909&place_id=any&subview=map&swlat=41.450154&swlng=2.133768"
  );
  const json = await res.json();
  return json;
}
