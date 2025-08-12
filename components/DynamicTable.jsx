import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const DynamicTable = ({ data }) => {
  if (data.length === 0) {
    return <p className="text-center text-gray-500">No data found</p>;
  }
  const headers = Object.keys(data[0]);
  return (
    <Table className="w-full dynamic-table">
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index} className="avoid-page-break">
            {headers.map((header, index) => (
              <TableCell key={index} className="text-left  min-w-[150px]">
                {item[header]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DynamicTable;
