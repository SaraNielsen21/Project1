package edu.simpson.nielsen;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * Created by sara.nielsen on 1/26/2017.
 */
@WebServlet(name = "NameListGet")
public class NameListGet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        // Set the output type, and get the output stream
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Use the DAO to get a list of people
        List <Person> peopleList = PersonDAO.getPeople();

        // Start the JSON output. We'll have an array of people, so start with a "[" which signifies an array
        out.print("[");

        // Keep a boolean so we can figure out where to put the stupid commas.
        boolean start = false;

        // Loop through each person in the list.
        for (Person person : peopleList) {

            // Here we need to figure out if we should print a comma
            if (!start) {
                start = true;
                out.println();
            } else
                out.println(",");

            // Start printing out field, name combinations.
            out.print("{\"id\" : ");
            out.print("\"");
            out.print(person.getId());
            out.print("\",");

            out.print("\"first\" : ");
            out.print("\"");
            out.print(person.getFirst());
            out.print("\",");

            out.print("\"last\" : ");
            out.print("\"");
            out.print(person.getLast());
            out.print("\",");

            out.print("\"email\" : ");
            out.print("\"");
            out.print(person.getEmail());
            out.print("\",");

            out.print("\"phone\" : ");
            out.print("\"");
            out.print(person.getPhone());
            out.print("\",");

            out.print("\"birthday\" : ");
            out.print("\"");
            out.print(person.getBirthday());
            out.print("\"");

            out.print("}");
        }
        out.println("\r\n]");
    }
}
