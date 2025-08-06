import "./Shows.css"


const Shows = () => {
  return (
    <div className="page-content-container">
      <h1>SHOWS</h1>

      <table className="shows-table">
        <thead>
          <th>UPCOMING</th>
            <th/>
            <th/>
        </thead>
        <tbody>
          <tr>
            <td>11/05/2002</td>
            <td>Paradise Rock Club</td>
            <td>Boston, MA</td>
          </tr>
            <th>PAST</th>
            <th/>
            <th/>
          <tr>
            <td>11/05/2002</td>
            <td>Paradise Rock Club</td>
            <td>Boston, MA</td>
          </tr>
          <tr>
            <td>11/05/2002</td>
            <td>Paradise Rock Club</td>
            <td>Boston, MA</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Shows