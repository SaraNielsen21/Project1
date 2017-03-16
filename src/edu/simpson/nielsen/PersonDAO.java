package edu.simpson.nielsen;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import static jdk.nashorn.internal.runtime.regexp.joni.Config.log;

/**
 * Created by sara.nielsen on 1/26/2017.
 */
public class PersonDAO {
    /**
     * Get a list of the people in the database.
     * @return Returns a list of instances of the People class.
     */
    public static List<Person> getPeople() {
        final Logger log = Logger.getLogger(PersonDAO.class.getName());
        log.log(Level.FINE, "Get people");

        // Create an empty linked list to put the people we get from the database into.
        List<Person> list = new LinkedList<Person>();

        // Declare our variables
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        // Databases are unreliable. Use some exception handling
        try {
            // Get our database connection
            conn = DBHelper.getConnection();

            // This is a string that is our SQL query.
            String sql = "select id, first, last, email, phone, birthday from person";

            // If you had parameters, it would look something like
            // String sql = "select id, first, last, phone from person where id = ?";

            // Create an object with all the info about our SQL statement to run.
            stmt = conn.prepareStatement(sql);

            // If you had parameters, they would be set wit something like:
            // stmt.setString(1, "1");

            // Execute the SQL and get the results
            rs = stmt.executeQuery();

            // Loop through each record
            while(rs.next()) {
                // Create a new instance of the Person object.
                // You'll need to define that somewhere. Just a simple class with getters and setters on the
                // fields.
                Person person = new Person();

                // Get the data from the result set, and copy it to the Person object
                person.setId(rs.getInt("id"));
                person.setFirst(rs.getString("first"));
                person.setLast(rs.getString("last"));
                person.setEmail(rs.getString("email"));
                person.setPhone(rs.getString("phone"));
                person.setBirthday(rs.getString("birthday"));

                // Add this person to the list so we can return it.
                list.add(person);
            }
        } catch (SQLException se) {
            log.log(Level.SEVERE, "SQL Error", se );
        } catch (Exception e) {
            log.log(Level.SEVERE, "Error", e );
        } finally {
            // Ok, close our result set, statement, and connection
            try { rs.close(); } catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }
            try { stmt.close(); } catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }
            try { conn.close(); } catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }
        }
        // Done! Return the results
        return list;
    }

    public static void addPerson(Person person)
    {
        final Logger log = Logger.getLogger(PersonDAO.class.getName());
        log.log(Level.FINE, "Add people");

        // Declare our variables
        Connection conn = null;
        PreparedStatement stmt = null;

        try{
            // Get our database connection
            conn = DBHelper.getConnection();

            // String for our sql query
            String sql = "insert into cis320.person (first, last, email, phone, birthday) values (?,?,?,?,?)";

            // Create an object with all the info about our SQL statement to run.
            stmt = conn.prepareStatement(sql);

            //set parameters
            stmt.setString(1,person.getFirst());
            stmt.setString(2,person.getLast());
            stmt.setString(3,person.getEmail());
            stmt.setString(4,person.getPhone());
            stmt.setString(5,person.getBirthday());

            // Execute the SQL and get the results
            stmt.executeUpdate();

        } catch (SQLException se) {
            log.log(Level.SEVERE, "SQL Error", se );
        } catch (Exception e) {
            log.log(Level.SEVERE, "Error", e );
        } finally {
            // Ok, close our result set, statement, and connection
            try { stmt.close(); } catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }
            try { conn.close(); } catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }
        }

    }

    public static void deletePerson(String id)
    {
        final Logger log = Logger.getLogger(PersonDAO.class.getName());
        log.log(Level.FINE, "Add people");

        Connection conn = null;
        PreparedStatement stmt = null;

        try{
            // Get our database connection
            conn = DBHelper.getConnection();

            // String for our sql query
            String sql = "delete from cis320.person where id = ?";

            // Create an object with all the info about our SQL statement to run.
            stmt = conn.prepareStatement(sql);

            //set parameters
            stmt.setString(1,id);

            // Execute the SQL and get the results
            stmt.executeUpdate();

        } catch (SQLException se) {
            log.log(Level.SEVERE, "SQL Error", se );
        } catch (Exception e) {
            log.log(Level.SEVERE, "Error", e );
        } finally {
            // Ok, close our result set, statement, and connection
            try { stmt.close(); } catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }
            try { conn.close(); } catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }
        }
    }

    public static void editPerson(Person person)
    {
        final Logger log = Logger.getLogger(PersonDAO.class.getName());
        log.log(Level.FINE, "Edit people");

        Connection conn = null;
        PreparedStatement stmt = null;

        try{
            // Get our database connection
            conn = DBHelper.getConnection();

            // String for our sql query
            String sql = "update cis320.person set first = ?, last = ?, email = ?, phone = ?, birthday = ? where id = ?";

            // Create an object with all the info about our SQL statement to run.
            stmt = conn.prepareStatement(sql);

            //set parameters
            stmt.setString(1,person.getFirst());
            stmt.setString(2,person.getLast());
            stmt.setString(3,person.getEmail());
            stmt.setString(4,person.getPhone());
            stmt.setString(5,person.getBirthday());
            stmt.setString(6, Integer.toString(person.getId()));

            // Execute the SQL and get the results
            stmt.executeUpdate();

        } catch (SQLException se) {
            log.log(Level.SEVERE, "SQL Error", se );
        } catch (Exception e) {
            log.log(Level.SEVERE, "Error", e );
        } finally {
            // Ok, close our result set, statement, and connection
            try { stmt.close(); } catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }
            try { conn.close(); } catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }
        }
    }
}
