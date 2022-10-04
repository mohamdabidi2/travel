import useGoogleSheets from 'use-google-sheets';
import Spreadsheet from "react-spreadsheet";
import TableIO from './tables';

const SheetGoogleApi = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: "AIzaSyCPhOfXbi2xFLx39JsvQhvxbE1wAvA2z3w",
    sheetId: "16SHBdFK4pzCgPBokeCxueF2mxpgoFo1BU_lLxI1c-Iw",
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  return <div>
    


    </div>;
};
export default SheetGoogleApi