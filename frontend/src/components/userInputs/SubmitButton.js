import React from 'react'
import { Button } from 'react-bootstrap';

function SubmitButton({label}) {
   

  return (
    <Button type="submit" variant="primary" className="my-2 w-100">
      {label}
    </Button>
  );
}

export default SubmitButton