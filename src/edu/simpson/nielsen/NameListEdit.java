package edu.simpson.nielsen;

/**
 * Created by sara.nielsen on 2/14/2017.
 */
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NameListEdit extends HttpServlet {
    /*
     Handle Post requests
     */
    private Pattern nameValidationPattern;
    private Pattern emailValidationPattern;
    private Pattern phoneValidationPattern;
    private Pattern birthdayValidationPattern;

    public NameListEdit() {
        nameValidationPattern = Pattern.compile("^[^{L}]{1,30}$");
        emailValidationPattern = Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
        phoneValidationPattern = Pattern.compile("^[0-9]{10}$");
        birthdayValidationPattern = Pattern.compile("^(19[0-9][0-9]|20[0-9][0-9])-(0[1-9]|1[1,2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Print that this is a post
        out.println("Post");

        // Grab the data we got via a parameter
        String id = request.getParameter("id");
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        String birthday = request.getParameter("birthday");

        // Just print the data out to confirm we got it.
        out.println("id='" +id+"'");
        out.println("firstName='"+firstName+"'");
        out.println("lastName='"+lastName+"'");
        out.println("email='"+email+"'");
        out.println("phone='"+phone+"'");
        out.println("birthday='"+birthday+"'");

        Matcher firstM = nameValidationPattern.matcher(firstName);
        Matcher lastM = nameValidationPattern.matcher(lastName);
        Matcher emailM = emailValidationPattern.matcher(email);
        Matcher phoneM = phoneValidationPattern.matcher(phone);
        Matcher birthdayM = birthdayValidationPattern.matcher(birthday);

        if(firstM.find() && lastM.find() && emailM.find() && phoneM.find() && birthdayM.find()) {
            out.println("Passed validation");
            Person person = new Person();
            person.setFirst(firstName);
            person.setLast(lastName);
            person.setEmail(email);
            person.setPhone(phone);
            person.setBirthday(birthday);

            if(id.equals("")) {
                PersonDAO.addPerson(person);
            }
            else {
                person.setId(Integer.parseInt(id));
                PersonDAO.editPerson(person);
            }
        }
        else {
            out.println("Did not pass validation.");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Print that this is a get, not a post
        out.println("Get");

        // Grab the data we got via a parameter
        String firstName = request.getParameter("firstName");

        // Just print the data out to confirm we got it.
        out.println("firstName='"+firstName+"'");
    }
}
