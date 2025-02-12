const Botton = (props) => {
  const { children, classname, onClick, type = "button" } = props;
  return (
    <button
      className={`h-[10] px-6 py-2 font-semibold rounded-md ${classname} text-white`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Botton;
