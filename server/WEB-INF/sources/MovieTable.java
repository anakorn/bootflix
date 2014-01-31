import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import javax.naming.*;
import java.sql.*;
import javax.sql.DataSource;

import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

public class MovieTable extends HttpServlet
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
    PreparedStatement statement = null;

    try {
      connection = dataSource.getConnection();

      // If movie ID specified, it takes precedence over other parameters
      String queryId = request.getParameter("id");
      if (queryId != null && !queryId.isEmpty()) {
        statement = connection.prepareStatement(
          "SELECT * FROM movies " +
          "WHERE id = ? LIMIT 1"
        );
        statement.setInt(1, Integer.valueOf(queryId));

      } else {

        String queryTitle = request.getParameter("title");
        String queryStartsWith = request.getParameter("starts_with");
        String queryYear = request.getParameter("year");
        String queryDirector = request.getParameter("director");
        String queryBannerUrl = request.getParameter("banner_url");
        String queryTrailerUrl = request.getParameter("trailer_url");
        String queryStarId = request.getParameter("star_id");
        String queryGenreId = request.getParameter("genre_id");

        String queryLimit = request.getParameter("limit");
        String queryOffset = request.getParameter("offset");
        String queryOrderBy = request.getParameter("order_by");
        String queryDesc = request.getParameter("desc");

        boolean isOrdered = false;
        if (queryOrderBy != null && !queryOrderBy.isEmpty()) {
          isOrdered = queryOrderBy.equalsIgnoreCase("title") || 
            queryOrderBy.equalsIgnoreCase("year") ||
            queryOrderBy.equalsIgnoreCase("director");
        }

        if (queryStarId != null && !queryStarId.isEmpty()) {
          statement = connection.prepareStatement(
            "SELECT movies.* FROM movies JOIN (SELECT * FROM stars_in_movies WHERE star_id = ?) m_s " +
            "WHERE m_s.movie_id = movies.id " +
            "AND title LIKE ? " +
            "AND title LIKE ? " +
            "AND year LIKE ? " +
            "AND director LIKE ? " +
            "AND banner_url LIKE ? " +
            "AND trailer_url LIKE ? " +
            // (isOrdered ? "ORDER BY " + queryOrderBy + (Boolean.valueOf(queryDesc) ? " DESC " : "") : "") +
            "LIMIT ? OFFSET ?"
          );

          statement.setInt(1, queryStarId == null || queryStarId.isEmpty() ? -1 : Integer.valueOf(queryStarId));
          statement.setString(2, queryTitle == null || queryTitle.isEmpty() ? "%" : "%" + queryTitle + "%");
          statement.setString(3, queryStartsWith == null || queryStartsWith.isEmpty() ? "%" : queryStartsWith + "%");
          statement.setString(4, queryYear == null || queryYear.isEmpty() ? "%" : "%" + queryYear + "%");
          statement.setString(5, queryDirector == null || queryDirector.isEmpty() ? "%" : "%" + queryDirector + "%");
          statement.setString(6, queryBannerUrl == null || queryBannerUrl.isEmpty() ? "%" : "%" + queryBannerUrl + "%");
          statement.setString(7, queryTrailerUrl == null || queryTrailerUrl.isEmpty() ? "%" : "%" + queryTrailerUrl + "%");
          statement.setInt(8, queryLimit == null || queryLimit.isEmpty() ? 10 : Integer.valueOf(queryLimit));
          statement.setInt(9, queryOffset == null || queryOffset.isEmpty() ? 0 : Integer.valueOf(queryOffset));

        } else if (queryGenreId != null && !queryGenreId.isEmpty()) {
          statement = connection.prepareStatement(
            "SELECT movies.* FROM movies JOIN (SELECT * FROM genres_in_movies WHERE genre_id = ?) g_m " +
            "WHERE g_m.movie_id = movies.id " +
            "AND title LIKE ? " +
            "AND title LIKE ? " +
            "AND year LIKE ? " +
            "AND director LIKE ? " +
            "AND banner_url LIKE ? " +
            "AND trailer_url LIKE ? " +
            // (isOrdered ? "ORDER BY " + queryOrderBy + (Boolean.valueOf(queryDesc) ? " DESC " : "") : "") +
            "LIMIT ? OFFSET ?"
          );

          statement.setInt(1, queryGenreId == null || queryGenreId.isEmpty() ? -1 : Integer.valueOf(queryGenreId));
          statement.setString(2, queryTitle == null || queryTitle.isEmpty() ? "%" : "%" + queryTitle + "%");
          statement.setString(3, queryStartsWith == null || queryStartsWith.isEmpty() ? "%" : queryStartsWith + "%");
          statement.setString(4, queryYear == null || queryYear.isEmpty() ? "%" : "%" + queryYear + "%");
          statement.setString(5, queryDirector == null || queryDirector.isEmpty() ? "%" : "%" + queryDirector + "%");
          statement.setString(6, queryBannerUrl == null || queryBannerUrl.isEmpty() ? "%" : "%" + queryBannerUrl + "%");
          statement.setString(7, queryTrailerUrl == null || queryTrailerUrl.isEmpty() ? "%" : "%" + queryTrailerUrl + "%");
          statement.setInt(8, queryLimit == null || queryLimit.isEmpty() ? 10 : Integer.valueOf(queryLimit));
          statement.setInt(9, queryOffset == null || queryOffset.isEmpty() ? 0 : Integer.valueOf(queryOffset));

        } else {
          statement = connection.prepareStatement(
            "SELECT * FROM movies " +
            "WHERE title LIKE ? " +
            "AND title LIKE ? " +
            "AND year LIKE ? " +
            "AND director LIKE ? " +
            "AND banner_url LIKE ? " +
            "AND trailer_url LIKE ? " +
            // (isOrdered ? "ORDER BY " + queryOrderBy + (Boolean.valueOf(queryDesc) ? " DESC " : "") : "") +
            "LIMIT ? OFFSET ?"
          );

          statement.setString(1, queryTitle == null || queryTitle.isEmpty() ? "%" : "%" + queryTitle + "%");
          statement.setString(2, queryStartsWith == null || queryStartsWith.isEmpty() ? "%" : queryStartsWith + "%");
          statement.setString(3, queryYear == null || queryYear.isEmpty() ? "%" : "%" + queryYear + "%");
          statement.setString(4, queryDirector == null || queryDirector.isEmpty() ? "%" : "%" + queryDirector + "%");
          statement.setString(5, queryBannerUrl == null || queryBannerUrl.isEmpty() ? "%" : "%" + queryBannerUrl + "%");
          statement.setString(6, queryTrailerUrl == null || queryTrailerUrl.isEmpty() ? "%" : "%" + queryTrailerUrl + "%");
          statement.setInt(7, queryLimit == null || queryLimit.isEmpty() ? 10 : Integer.valueOf(queryLimit));
          statement.setInt(8, queryOffset == null || queryOffset.isEmpty() ? 0 : Integer.valueOf(queryOffset));

        }
      }

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