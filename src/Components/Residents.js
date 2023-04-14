


import React, { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from "react-table";
import { Table, Row, Col, Button, Input, Container } from "reactstrap";

export const Residents = ({ data }) => {
    const columns = useMemo(() => [
        {
            Header: "Name"
            , accessor: "name",
            disableSortBv: "true",
            width: '300',
        },
        {
            Header: "Gender"
            , accessor: "gender"
            , width: 140,
        },
        {
            Header: "Height"
            , accessor: "height"
            , width: 140,
        },
        { Header:"skincolor'" , accesso: "skin_color" },
        { Header: "Eyecolor", accessor: "eye_color", },
        { Header: "Mass", accessor: "mass" },
        { Header: "HairColor", accessor: "hair_color", },
    ], []);


 const{
     getTableProps, 
     getTableBodyProps, 
     headerGroups,
      page, 
      prepareRow, 
      visiblecolumns, 
       canPreviousPage, 
       canNextPage, 
       pageOptions, 
       pageCount, 
       gotoPage, 
       nextPage, 
       previouspage, 
       setPageSize, 
       state: {pageIndex, pageSize} }= useTable(
         {
          columns, 
          data, 
          initialState: { pageIndex: 0, pageSize: 10 }
         },
        useSortBy, 
        usePagination
        );
        const onChangeInSelect = event => {
         setPageSize(Number(event.target.value))
        };

       const onChangeInInput = event => { 
             const page = event.target.value ? Number(event.target.value) - 1 : 0
             gotoPage(page);
        }

       const  generateSortingIndicator = column => {
          return  column.isSorted ? (column.isSortedDesc ? "@" : "©") : ''
       } 
      return (
        <Container className = { 'cui-resident-table' }>
          <Table bordered {...getTableProps()} className = {'cui-resident-list'}>
           <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                     <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                        {generateSortingIndicator}
                     </th>
                })}
              </tr>
            ))}
           </thead>
           <tbody {...getTableBodyProps()}>
             {page.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      })}
                    </tr>
                )
             })}
           </tbody>
           </Table>
           <div className='cui-resident-pagination'>
              <Row className ='cui-resident-row'>
               <Col md={3}>
                <Button 
                  color="primary"
                  onClick={()=> gotoPage(0)}
                  disabled={!canPreviousPage}
                  > 
                  {"<<"}
                  </Button>
                  <Button 
                  color="primary"
                  onClick={()=> gotoPage(0)}
                  disabled={!canPreviousPage}
                  > 
                  {"<"}
                  </Button>
               </Col>
               <Col md={2}>
               Page{ " "}
               <strong>
                 {pageIndex + 1} of {pageOptions.length}
               </strong>
               </Col>
               <Col md={2}>
                  <Input
                    type="number"
                    min={1}
                    style={{ width: 70}}
                    max={pageOptions.length}
                    defaultValues={pageIndex + 1}
                    onChange={onChangeInInput}
                    />
               </Col>
               <Col md={2}>
                <Input type="select" value={pageSize} onChange={onChangeInSelect}>
                   {[10,20,30,40,50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                   ))}
                </Input>
               </Col>
               <Col md={3}>
                <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
                {">"}
                </Button>
                <Button color="primary" onClick={()=> gotoPage(pageCount - 1)} 
                  disabled={!canNextPage}>
                {">>"}
                </Button>
               </Col>
              </Row>
           </div>
        </Container>
      )
 }  
   