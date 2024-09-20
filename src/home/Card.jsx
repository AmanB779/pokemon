const Card = ({ name, url }) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="card">
      <img src={url} alt={name} />
      <h2>{capitalizeFirstLetter(name)}</h2>
    </div>
  );
};

export default Card;
