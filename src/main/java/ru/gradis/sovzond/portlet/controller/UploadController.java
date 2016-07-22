package ru.gradis.sovzond.portlet.controller;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import ru.gradis.sovzond.model.dao.XmlAnalysisDAO;
import ru.gradis.sovzond.model.domain.FileVO;

import java.io.*;

/**
 * Created by donchenko-y on 6/30/16.
 */

@RestController
public class UploadController {

	@SuppressWarnings("SpringJavaAutowiringInspection")
	@Autowired
	private XmlAnalysisDAO xmlAnalysisDAO;

	private static final Log log = LogFactoryUtil.getLog(UploadController.class);

	@RequestMapping(value = "/GridServices/upload", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public
	@ResponseBody
	String handleFormUpload(@RequestParam("files[]") MultipartFile file, @ModelAttribute FileVO fileVO) {
		String json = "";

		if (!file.isEmpty()) {
			try {
				byte[] bytesOfFile = file.getBytes();
				json = (String) xmlAnalysisDAO.executeAnalysis(bytesOfFile, file.getName(), FilenameUtils.getExtension(file.toString()));
				fileVO.setMessage(json);
				log.info(json);
				return json;
			} catch (IOException e) {
				log.error(e);
			}
		}
		return "ERROR";
	}

	private byte[] fileToByte(InputStream inputStream) {
		try {
			return IOUtils.toByteArray(inputStream);
		} catch (IOException e) {
			e.printStackTrace();
			log.error(e);
		}
		return null;
	}

}
