import Image from "next/image";

export default function ProjectItem({ data }: any) {
  const title = data.properties.Name.title[0].plain_text;
  const content = data.properties.Description.rich_text[0].plain_text;
  const imgSrc = data.cover.external.url;
  const tags = data.properties.Tag.multi_select;

  const start = data.properties.Duration.date.start;
  const end = data.properties.Duration.date.end;

  const calculatedPeriod = (start: any, end: any) => {
    const startDateStringArray = start.split("-");
    const endDateStringArray = end.split("-");

    const startDate = new Date(
      startDateStringArray[0],
      startDateStringArray[1],
      startDateStringArray[2]
    );
    const endDate = new Date(
      endDateStringArray[0],
      endDateStringArray[1],
      endDateStringArray[2]
    );

    console.log(`startDate: ${startDate}`);
    console.log(`endDate: ${endDate}`);

    const diffInMs = Math.abs(+endDate - +startDate);
    const result = diffInMs / (1000 * 60 * 60 * 24);

    console.log(`기간 : ${result}`);
    return result;
  };

  return (
    <div className="project-card">
      <div style={{ position: "relative", width: "100%", height: "200px" }}>
        <Image
          src={imgSrc}
          fill
          alt="cover image"
          className="rounded-xl"
          quality={100}
        />
      </div>
      <div className="p-4 flex flex-col">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h3 className="mt-4 text-xl">{content}</h3>
        <p className="my-1">
          {start} ~ {end}
        </p>
        <div className="flex items-start mt-2">
          {tags.map((tag: any) => (
            <h1
              key={tag.id}
              className="px-2 py-1 mr-2 rounded-md bg-sky-200 dark:bg-sky-700 w-300">
              {tag.name}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
}
