package projects.dao;

import com.exponentus.common.dao.DAO;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.scripting._Session;
import projects.model.Comment;

import java.util.UUID;

public class CommentDAO extends DAO<Comment, UUID> {

    public CommentDAO(_Session session) throws DAOException {
        super(Comment.class, session);
    }
}
