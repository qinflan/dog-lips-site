import "./Shows.css"


const Shows = () => {
  return (
    <div className="page-content-container">
      <h1>SHOWS</h1>

      <table className="shows-table">
        <thead>
          <th>City</th>
          <th>Date</th>
          <th>Venue</th>
          <th>Time</th>
          <th>Bands</th>
          <th>Price</th>
        </thead>
        <tbody>
          <tr>
            <td>Boston, MA</td>
            <td>11/05/2002</td>
            <td>Paradise Rock Club</td>
            <td>7pm</td>
            <td>Big Stink, Tony From Bowling, Plant Fight</td>
            <td>$20</td>
          </tr>
          <tr>
            <td>Boston, MA</td>
            <td>11/05/2002</td>
            <td>Paradise Rock Club</td>
            <td>7pm</td>
            <td>Big Stink, Tony From Bowling, Plant Fight</td>
            <td>$20</td>
          </tr>
          <tr>
            <td>Boston, MA</td>
            <td>11/05/2002</td>
            <td>Paradise Rock Club</td>
            <td>7pm</td>
            <td>Big Stink, Tony From Bowling, Plant Fight</td>
            <td>$20</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Shows