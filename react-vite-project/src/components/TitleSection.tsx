interface TitleSectionProps {
    title: string;
    subtitle: string;
}

const TitleSection = (props: TitleSectionProps) => {
    return (
        <>
            <h1 className="text-5xl font-bold text-blue-900 sm:text-3xl">
                {props.title}
            </h1>
            <p className="mt-2 text-sm text-blue-600">
                {props.subtitle}
            </p>
        </>
    );
};

export default TitleSection;