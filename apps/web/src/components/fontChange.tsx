import { useState } from "react";

export function FontChange() {



  const ArialFont= 'Arial, sans-serif';
  const TimesNewRomanFont= 'Times New Roman, serif';
  const HelveticaFont= 'Helvetica, sans-serif';
  const SegoeUIFont= 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
  
  const [fontFamily, changeFont] = useState<string>(ArialFont);


return(

<div>
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
      <div className="dropdown-menu">
        <a className="dropdown-item" href="#one" onClick={() => changeFont(TimesNewRomanFont)} >Times new Roman </a>
        <div role="separator" className="dropdown-divider" ></div>
        <a className="dropdown-item" href="#two" onClick={() => changeFont(HelveticaFont)}>Helvetica</a>
        <div role="separator" className="dropdown-divider" ></div>
        <a className="dropdown-item" href="#three" onClick={() => changeFont(SegoeUIFont)}>Segoe UI</a>
        <div role="separator" className="dropdown-divider" ></div>
        <a className="dropdown-item" href="#three" onClick={() => changeFont(ArialFont)}>Arial Font</a>
      </div>
    </li>
    </div>

);
}