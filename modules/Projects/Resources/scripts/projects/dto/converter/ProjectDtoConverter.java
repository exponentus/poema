package projects.dto.converter;

import com.exponentus.common.dto.converter.GenericConverter;
import projects.model.Project;
import staff.model.Organization;

public class ProjectDtoConverter implements GenericConverter<Project, Project> {

    @Override
    public Project apply(Project prj) {

        Project dto = new Project();
        dto.setId(prj.getId());
        dto.setName(prj.getName());
        dto.setStatus(prj.getStatus());
        dto.setPrimaryLanguage(prj.getPrimaryLanguage());
        Organization customer = new Organization();
        customer.setName(prj.getCustomer().getName());
        dto.setCustomer(customer);
        dto.setRepresentatives(prj.getRepresentatives());
        dto.setManager(prj.getManager());
        dto.setProgrammer(prj.getProgrammer());
        dto.setTester(prj.getTester());
        dto.setFinishDate(prj.getFinishDate());
        dto.setHasAttachments(prj.getHasAttachments());

        return dto;
    }
}
