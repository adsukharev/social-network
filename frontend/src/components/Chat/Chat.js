import React from 'react';

export default function Chat() {
    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}


// import sortMultidimensionalArrayFunc from 'sort-multidimensional-array-func';
// import { block } from 'bem-cn';
// const cn = require('bem-cn')('table');
//
// let { block } = require('bem-cn');

// const TABLE_COLUMNS = [
//     {
//         label: 'Name',
//         sort: 'default',
//     },
//     {
//         label: 'ID',
//         sort: 'default',
//     },
//     {
//         label: 'Count',
//         sort: 'default',
//     },
// ];
//
// const SortableHeader = (props) => {
//     const { columns, onClick } = props;
//
//     return(
//         <thead>
//         <tr>
//             {columns.map((element, index) =>
//                 <th
//                     key={index}
//                     className={cn('sorting').state({
//                         sortASC: element.sort === 'asc',
//                         sortDESC: element.sort === 'desc',
//                     }).mix('sorting-block text-nowrap')}
//                     onClick={() => onClick(index, element.sort)}
//                 >
//                     {element.label}
//                 </th>
//             )}
//         </tr>
//         </thead>
//     );
// }
//
// const SortableBody = (props) => {
//     const { data } = props;
//
//     return(
//         <tbody>
//         {data.map((element, index) =>
//             <tr key={index}>
//                 {element.map((item, i) =>
//                     <td key={i}>{item}</td>
//                 )}
//             </tr>
//         )}
//         </tbody>
//     );
// }
//
// export default class SortableTable extends React.Component {
//     static propTypes = {
//         data: React.PropTypes.array,
//     };
//
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             data: [],
//             columns: TABLE_COLUMNS,
//         };
//     }
//
//     componentWillMount() {
//         const { data } = this.props;
//         this.setState({ data });
//     }
//
//     componentWillReceiveProps(nextProps) {
//         const { data } = nextProps;
//         this.setState({ data });
//     }
//
//     render() {
//         return (
//             <table className={cn}>
//                 <SortableHeader columns={this.state.columns} onClick={this.sortTableFunc} />
//                 <SortableBody data={this.state.data} />
//             </table>
//         );
//     }
//
//     sortTableFunc = (id, sortMethod) => {
//         const { data, columns } = this.state;
//
//         let currentSortMethod = 'default';
//
//         switch (sortMethod) {
//             case 'default':
//                 currentSortMethod = 'asc';
//                 break;
//             case 'asc':
//                 currentSortMethod = 'desc';
//                 break;
//             case 'desc':
//                 currentSortMethod = 'asc';
//                 break;
//             default:
//                 currentSortMethod = 'asc';
//         }
//
//         const changeColumn = columns.map((e, i) =>
//             ({ ...e, sort: i === id ? currentSortMethod : 'default' })
//         );
//
//         const sortData = sortMultidimensionalArrayFunc(data, id, currentSortMethod);
//
//         this.setState({
//             data: sortData,
//             columns: changeColumn,
//         });
//     }
// }
