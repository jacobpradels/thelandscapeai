
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="card">
      <div className="card-body">
        {icon}
        <h3 className="card-title">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
