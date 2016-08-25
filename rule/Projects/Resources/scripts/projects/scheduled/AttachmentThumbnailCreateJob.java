package projects.scheduled;

import com.exponentus.common.dao.AttachmentDAO;
import com.exponentus.common.model.Attachment;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._DoScheduledTask;

import java.util.List;

public class AttachmentThumbnailCreateJob extends _DoScheduledTask {

    @Override
    public void doEvery5Min(_Session session) {
        AttachmentDAO attachmentDAO = new AttachmentDAO(session);
        String[] supportedExt = {"jpeg", "jpg", "png", "gif"};
        List<Attachment> attList = attachmentDAO.findAllWithoutThumbnailByExtension(supportedExt);

        try {
            // TODO refactoring
//            File dir = new File("./thumbnails/");
//            dir.mkdirs();
//            for (Attachment att : attList) {
//                ByteArrayInputStream bis = new ByteArrayInputStream(att.getFile());
//                String outFile = "./thumbnails/" + att.getIdentifier() + ".jpg";
//                ImageUtil.createJpegThumbnail(bis, outFile);
//                att.setHasThumbnail(true);
//                attachmentDAO.update(att);
//            }

            System.out.println("AttachmentThumbnailCreateJob: do every 5 min; atts: " + attList.size());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void doEvery1Hour(_Session session) {
    }

    @Override
    public void doEveryNight(_Session session) {
    }
}
