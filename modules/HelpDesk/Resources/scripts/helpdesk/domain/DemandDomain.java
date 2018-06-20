package helpdesk.domain;

import com.exponentus.common.domain.CommonDomain;
import com.exponentus.common.domain.IValidation;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.util.StringUtil;
import helpdesk.dao.DemandDAO;
import helpdesk.model.Demand;
import org.apache.commons.lang3.StringUtils;
import reference.dao.DemandTypeDAO;
import reference.model.DemandType;

public class DemandDomain extends CommonDomain<Demand> {

    public DemandDomain(_Session ses) throws DAOException {
        super(ses);
        dao = new DemandDAO(ses);
    }

    @Override
    public Demand fillFromDto(Demand dto, IValidation<Demand> validation, String formSesId) throws DTOException, DAOException {
        validation.check(dto);

        Demand entity;
        DemandTypeDAO demandTypeDAO = new DemandTypeDAO(ses);

        if (dto.isNew()) {
            entity = new Demand();
            entity.setAuthor(ses.getUser());
            entity.addReaderEditor(entity.getAuthor());
        } else {
            entity = dao.findById(dto.getId());
        }

        DemandType demandType = demandTypeDAO.findById(dto.getDemandType().getId());
        entity.setDemandType(demandType);
        entity.setStatus(dto.getStatus());
        entity.setStatusDate(dto.getStatusDate());
        String title = dto.getTitle();
        if (title == null || title.isEmpty()) {
            title = StringUtils.abbreviate(StringUtil.cleanFromMarkdown(dto.getBody()), 140);
        }
        entity.setTitle(title);
        entity.setBody(dto.getBody());
        entity.setTags(dto.getTags());
        entity.setProject(dto.getProject());
        entity.setOriginator(dto.getOriginator());
        entity.setWayOfInteraction(dto.getWayOfInteraction());
        entity.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments(), formSesId));

        return entity;
    }
}
