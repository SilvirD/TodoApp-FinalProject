const Card = ({ name, description, onPageChange }) => {
  return (
    <div className="card" onClick={onPageChange}>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Card;
