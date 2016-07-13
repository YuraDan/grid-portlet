
package ru.gradis.sovzond.portlet.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.Locale;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;


import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import org.springframework.web.servlet.ModelAndView;
import ru.gradis.sovzond.model.dao.ParcelDAO;
import ru.gradis.sovzond.model.dao.XmlAnalysisDAO;
import ru.gradis.sovzond.model.domain.FileVO;

/**
 * Handles requests for the view mode.
 */
@Controller
public class HomeController {


	@SuppressWarnings("SpringJavaAutowiringInspection")
	@Autowired
	private ParcelDAO parcelDAO;


	private static final Log log = LogFactoryUtil.getLog(HomeController.class);

	@RequestMapping("VIEW")
	public ModelAndView home(Locale locale, ModelAndView model) throws IOException {


		log.info("Welcome home from portlet MVC! the client locale is " + locale.toString());
		model.setViewName("home");

		return model;
	}

	@ModelAttribute("fileVO")
	public FileVO getCommandObject() {
		System.out.println("SpringFileController -> getCommandObject -> Building VO");
		return new FileVO();
	}

//	@RequestMapping(value = "/upload", method = RequestMethod.GET)
//	public String handleFormUpload(@RequestParam("filename") String name,
//	                               @RequestParam("files[]") MultipartFile file, @ModelAttribute FileVO fileVO) {
//
//		if (!file.isEmpty()) {
//			try {
//				byte[] bytesOfFile = file.getBytes();
//				fileVO.setMessage(bytesOfFile.toString());
//				log.info(bytesOfFile.toString());
//			} catch (IOException e) {
//				e.printStackTrace();
//				log.error(e);
//			}
//			// store the bytes somewhere
//			return "DONE";
//		}
//
//		return "DONE";
//	}

//	@ActionMapping
//	public void upload(@ModelAttribute FileVO fileVO, ActionRequest request, ActionResponse response) {
//
//		byte[] byteOfFile = new byte[0];
//
//		UploadPortletRequest uploadRequest = PortalUtil.getUploadPortletRequest(request);
//
//		long sizeInBytes = uploadRequest.getSize(fileInputName);
//
//		if (uploadRequest.getSize(fileInputName) == 0) {
//			System.out.println("Received file is 0 bytes!");
//		}
//
//		// Get the uploaded file as a file.
//		File uploadedFile = uploadRequest.getFile(fileInputName);
//
//		try {
//			byteOfFile = fileToByte(uploadRequest.getFileAsStream(fileInputName));
//		} catch (IOException e) {
//			log.error(e);
//			e.printStackTrace();
//		}
//
//		String sourceFileName = uploadRequest.getFileName(fileInputName);
//
////		FilenameUtils.getExtension(uploadedFile.toString());
//
//		// Where should we store this file?
//		File folder = new File(baseDir);
//
//		// Check minimum 1GB storage space to save new files...
//
//		if (folder.getUsableSpace() < ONE_GB) {
//			System.out.println("Out of disk space!");
//		}
//
//		// This is our final file path.
//		File filePath = new File(folder.getAbsolutePath() + File.separator + sourceFileName);
//
//		String json = (String) xmlAnalysisDAO.executeAnalysis(byteOfFile, uploadedFile.getName(), FilenameUtils.getExtension(uploadedFile.toString()));
//		fileVO.setMessage(json);
//
//	}

}
