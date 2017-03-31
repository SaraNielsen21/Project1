package edu.simpson.nielsen;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;


@WebServlet(name = "SetLogin")
public class SetLogin extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        String loginKey = request.getParameter("loginKey");
        String loginValue = request.getParameter("loginValue");

        HttpSession session = request.getSession();
        session.setAttribute(loginKey, loginValue);

        out.println(loginKey + " = " + loginValue);
        out.println("Done setting the session variable");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}