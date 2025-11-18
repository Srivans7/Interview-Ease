CREATE TABLE Candidate (
    candidate_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    address VARCHAR(100),
    password VARCHAR(100),
    phone_number VARCHAR(20),
    resume VARCHAR(255)
);

CREATE TABLE vacancy (
  id INT AUTO_INCREMENT PRIMARY KEY,
  position VARCHAR(200) NOT NULL,
  availability INT NOT NULL,
  description TEXT NOT NULL,
  status TINYINT(1) NOT NULL DEFAULT 1,
  date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  duration INT NOT NULL DEFAULT 0
);


CREATE TABLE application (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  middlename VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  email VARCHAR(100) NOT NULL,
  contact VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  cover_letter TEXT NOT NULL,
  vacancy_id INT NOT NULL,
  resume_path TEXT NOT NULL,
  date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE interview (
  id INT AUTO_INCREMENT PRIMARY KEY,
  candidate_id INT NOT NULL,
  vacancy_id INT NOT NULL,
  interview_date DATETIME NULL , -- Default to the current date and time
  location VARCHAR(100) DEFAULT 'Not specified', -- Default location
  interviewer VARCHAR(100) DEFAULT 'TBD', -- Default interviewer
  status_name VARCHAR(50) DEFAULT 'Pending', -- Default status
  FOREIGN KEY (candidate_id) REFERENCES Candidate(candidate_id),
  FOREIGN KEY (vacancy_id) REFERENCES vacancy(id)
);


CREATE TABLE interview_feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  interview_id INT NOT NULL,
  feedback TEXT NOT NULL,
  FOREIGN KEY (interview_id) REFERENCES interview(id)
);


ALTER TABLE interview
ADD CONSTRAINT fk_candidate
FOREIGN KEY (candidate_id)
REFERENCES Candidate(candidate_id);

ALTER TABLE interview
ADD CONSTRAINT fk_vacancy
FOREIGN KEY (vacancy_id)
REFERENCES vacancy(id);

-- Add foreign key constraints for other tables as needed

-- ALTER TABLE interview
-- ADD COLUMN status_id INT,
-- ADD CONSTRAINT fk_interview_status
-- FOREIGN KEY (status_id)
-- REFERENCES interview_status(id);

ALTER TABLE application
ADD CONSTRAINT fk_vacancy_id
FOREIGN KEY (vacancy_id)
REFERENCES vacancy(id);


-- ALTER TABLE interview DROP FOREIGN KEY fk_interview_status;

-- Drop the column status_id



--Trigger

DELIMITER //

CREATE TRIGGER trg_application_insert
AFTER INSERT ON application
FOR EACH ROW
BEGIN
    DECLARE candidate_id_val INT;
    
    SELECT candidate_id INTO candidate_id_val
    FROM Candidate
    WHERE email = NEW.email;
    
    INSERT INTO interview (candidate_id, vacancy_id)
    VALUES (candidate_id_val, NEW.vacancy_id);
END;
//

DELIMITER ;