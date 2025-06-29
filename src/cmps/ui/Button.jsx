const Button = ({ variant = 'primary', children, onClick, href, ...props }) => {
  const className = `btn-${variant}`;
  
  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
