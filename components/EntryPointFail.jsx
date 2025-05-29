import BackgroundLayout from "./BackgroundLayout";
import NotFoundCard from "./NotFoundCard";

function EntryPointFail({
  error,
  title = "Authentication Error",
  suggestion = "Please check your internet connection and try again.",
  icon = "wifi",
  iconColor = "#eab308",
}) {
  return (
    <BackgroundLayout>
      <NotFoundCard
        title={title}
        message={error}
        suggestion={suggestion}
        icon={icon}
        iconColor={iconColor}
      />
    </BackgroundLayout>
  );
}

export default EntryPointFail;
