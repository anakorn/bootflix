import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import com.google.gson.Gson;

public class Jsonifier extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response) 
  throws IOException, ServletException {

    Object result = request.getAttribute("result");
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    Writer writer = null;

    try {
      writer = response.getWriter();
      writer.write(new Gson().toJson(result));
    } finally {
      writer.close();
    }
  }
}