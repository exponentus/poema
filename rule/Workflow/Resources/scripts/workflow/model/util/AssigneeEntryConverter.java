package workflow.model.util;

import java.io.IOException;
import java.sql.SQLException;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import org.postgresql.util.PGobject;

import com.exponentus.server.Server;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import workflow.model.embedded.AssigneeEntry;

@Converter(autoApply = true)
public class AssigneeEntryConverter implements AttributeConverter<AssigneeEntry, PGobject> {
	private static final ObjectMapper mapper = new ObjectMapper()
			.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

	@Override
	public PGobject convertToDatabaseColumn(AssigneeEntry val) {

		try {
			PGobject po = new PGobject();
			po.setType("json");
			po.setValue(mapper.writeValueAsString(val));
			return po;
		} catch (SQLException e) {
			Server.logger.errorLogEntry(e);
			return null;
		} catch (JsonGenerationException e) {
			Server.logger.errorLogEntry(e);
			return null;
		} catch (JsonMappingException e) {
			Server.logger.errorLogEntry(e);
			return null;
		} catch (IOException e) {
			Server.logger.errorLogEntry(e);
			return null;
		}
	}

	@Override
	public AssigneeEntry convertToEntityAttribute(PGobject po) {

		try {
			return mapper.readValue(po.getValue(), AssigneeEntry.class);
		} catch (Exception e) {
			Server.logger.errorLogEntry(e.toString());
			return new AssigneeEntry();
		}
	}
}