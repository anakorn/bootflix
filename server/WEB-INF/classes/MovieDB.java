import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import javax.naming.*;
import java.sql.*;
import javax.sql.DataSource;

import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

public class MovieDB extends HttpServlet
{

  private DataSource dataSource;

  public void init() throws ServletException {
    try {
      Context envCtx = (Context) new InitialContext().lookup("java:comp/env");
      dataSource = (DataSource) envCtx.lookup("jdbc/TestDB");
    } catch (NamingException e) {
      e.printStackTrace();
    }
  }

  public void doGet(HttpServletRequest request, HttpServletResponse response) 
  throws ServletException, IOException {

    Connection connection = null;
    try {
      connection = dataSource.getConnection();

      PreparedStatement statement = connection.prepareStatement(
        "SELECT * FROM movies " +
        "WHERE title LIKE ? " +
        "AND year LIKE ? " +
        "AND director LIKE ? " +
        "AND banner_url LIKE ? " +
        "AND trailer_url LIKE ? " +
        "LIMIT ?"
      );

      String queryTitle = request.getParameter("title");
      String queryYear = request.getParameter("year");
      String queryDirector = request.getParameter("director");
      String queryBannerUrl = request.getParameter("banner_url");
      String queryTrailerUrl = request.getParameter("trailer_url");
      String queryLimit = request.getParameter("limit");

      statement.setString(1, queryTitle == null || queryTitle.isEmpty() ? "%" : "%" + queryTitle + "%");
      statement.setString(2, queryYear == null || queryYear.isEmpty() ? "%" : "%" + queryYear + "%");
      statement.setString(3, queryDirector == null || queryDirector.isEmpty() ? "%" : "%" + queryDirector + "%");
      statement.setString(4, queryBannerUrl == null || queryBannerUrl.isEmpty() ? "%" : "%" + queryBannerUrl + "%");
      statement.setString(5, queryTrailerUrl == null || queryTrailerUrl.isEmpty() ? "%" : "%" + queryTrailerUrl + "%");
      statement.setInt(6, queryLimit == null || queryLimit.isEmpty() ? 25 : Integer.valueOf(queryLimit));

      // Perform the query
      ResultSet rs = statement.executeQuery();
      ResultSetMetaData rsmd = rs.getMetaData();
      ArrayList<Object> rows = new ArrayList<Object>();

      while (rs.next()) {
        Map<String, Object> row = new HashMap<String, Object>();
        for (int iCol = 1; iCol <= rsmd.getColumnCount(); ++iCol) {
          row.put(rsmd.getColumnName(iCol), rs.getObject(iCol));
        }
        rows.add(row);
      }
      rs.close();

      Map<String, Object> result = new HashMap<String, Object>();
      result.put("results", rows.toArray());
      request.setAttribute("result", result);
      request.getRequestDispatcher("/jsonifier").forward(request, response);

    } catch (SQLException e) {
      e.printStackTrace();
    } finally {
      if (connection != null) {
        try {
          connection.close();
        } catch (SQLException e) {
          e.printStackTrace();
        }
      }
    }
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) 
  throws IOException, ServletException {
    doGet(request, response);
  }
}