import React from "react";
import { Button } from "@mui/material";
import Lightbox from 'react-spring-lightbox';

export default function BasicExample({ image }) {
  const [toggler, setToggler] = React.useState(false);

  return (
    <>
      <Lightbox
        isOpen={toggler}
        images={[{ src: 'https://i.imgur.com/5EOyTDQ.jpg' }]}
        currentIndex={0}
      />

      <Button onClick={() => setToggler(true)} > View Image </Button>
    </>
  );
}

