-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 14, 2025 at 06:18 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `avishkaar_season_3`
--

-- --------------------------------------------------------

--
-- Table structure for table `abstract_draft_submissions`
--

CREATE TABLE `abstract_draft_submissions` (
  `draft_id` varchar(50) NOT NULL,
  `team_id` varchar(50) NOT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `problem_statement` text DEFAULT NULL,
  `theme` varchar(100) DEFAULT NULL,
  `technologies_used` varchar(255) DEFAULT NULL,
  `existing_project` enum('Yes','No') DEFAULT 'No',
  `abstract_description` text DEFAULT NULL,
  `last_saved` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `abstract_results`
--

CREATE TABLE `abstract_results` (
  `result_id` varchar(50) NOT NULL,
  `abstract_id` varchar(100) NOT NULL,
  `team_id` varchar(50) NOT NULL,
  `status` enum('Accepted','Rejected','On Review') DEFAULT 'On Review',
  `evaluated_by` varchar(50) DEFAULT NULL,
  `evaluated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `abstract_results`
--

INSERT INTO `abstract_results` (`result_id`, `abstract_id`, `team_id`, `status`, `evaluated_by`, `evaluated_at`) VALUES
('RES_BHA-A3-26022_1762689302797_3020B7', 'ABS_BHA-A3-26022_1761890348191', 'BHA-A3-26022', 'Accepted', 'BHA-A3-24160', '2025-11-09 11:55:02'),
('RES_KRA-A3-52661_1762768939863_7C5444', 'ABS_KRA-A3-52661_1762768827081', 'KRA-A3-52661', 'Accepted', 'BHA-A3-24160', '2025-11-10 10:02:19'),
('RES_T.P-A3-67868_1762596962411_DA1AAD', 'ABS_T.P-A3-67868_1761991441508', 'T.P-A3-67868', 'Accepted', 'BHA-A3-24160', '2025-11-08 10:16:02');

-- --------------------------------------------------------

--
-- Table structure for table `abstract_submissions`
--

CREATE TABLE `abstract_submissions` (
  `abstract_id` varchar(50) NOT NULL,
  `team_id` varchar(50) NOT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `problem_statement` text DEFAULT NULL,
  `theme` varchar(100) DEFAULT NULL,
  `technologies_used` varchar(255) DEFAULT NULL,
  `existing_project` enum('Yes','No') DEFAULT 'No',
  `abstract_description` text DEFAULT NULL,
  `submitted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `abstract_submissions`
--

INSERT INTO `abstract_submissions` (`abstract_id`, `team_id`, `file_path`, `video_url`, `problem_statement`, `theme`, `technologies_used`, `existing_project`, `abstract_description`, `submitted_at`, `created_at`, `updated_at`) VALUES
('ABS_BHA-A3-26022_1761890348191', 'BHA-A3-26022', '/uploads/abstracts/1761890348188-644287529.pdf', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=avishkaar_season_3&table=teams', 'Problem statement', 'Digital Empowerment', 'Telidhu', 'No', 'Abstract Submitted successfully', NULL, '2025-10-31 05:59:08', '2025-10-31 05:59:08'),
('ABS_KRA-A3-52661_1762768827081', 'KRA-A3-52661', '/uploads/abstracts/1762768827061-757073272.pdf', 'https://www.geeksforgeeks.org/dbms/normal-forms-in-dbms/', 'Byee', 'Digital Empowerment', 'SSC', 'No', 'Hello', NULL, '2025-11-10 10:00:27', '2025-11-10 10:00:27'),
('ABS_T.P-A3-67868_1761991441508', 'T.P-A3-67868', '/uploads/abstracts/1761991441482-55425712.pdf', 'https://www.youtube.com/watch?v=KDHWpbwFvsY&list=RDKDHWpbwFvsY&start_radio=1', 'full big problem', 'Healthcare', 'health', 'No', 'our resumeeeee', NULL, '2025-11-01 10:04:01', '2025-11-01 10:04:01');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `AdminId` varchar(50) NOT NULL,
  `AdminName` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`AdminId`, `AdminName`, `email`, `password`, `role`, `verified`, `created_at`) VALUES
('BHA-A3-24160', 'Bhargav', 'bhargavanaidujaddu@gmail.com', '$2b$10$RePAoTVcr1yy5zvXQYthPeZFMjKT12vuJdSubxBLd7fTAiWSiAcGi', 'Admin', 1, '2025-10-08 09:06:13'),
('KRA-A3-61550', 'kranthi', 'kkk@gmail.com', '$2b$10$U2HOe3a0lgVWJXmIf8ld.OutvxiEW2zleQXJyfCz5Paurgff9QqZK', 'Admin', 1, '2025-09-27 03:52:56'),
('KRA-A3-74656', 'kranthi', 'kranthi@gmail.com', '$2b$10$Zz22aVOPgiBOiE/P1AKfJeCBcGn8vJbfK/Qoqrx5Q0BcUUsYDcrK.', 'Admin', 1, '2025-09-25 13:26:35'),
('PRA-A3-67751', 'prasanth', 'prasanthpadma4@gmail.com', '$2b$10$nw2KX1U5S/mEeZYjmz3kSedFwBV49QA9vOjFW9.JUEciyIEEt.Q4q', 'Admin', 1, '2025-11-01 06:00:56');

-- --------------------------------------------------------

--
-- Table structure for table `Mentors`
--

CREATE TABLE `Mentors` (
  `Mentor_Id` varchar(50) NOT NULL,
  `Mentor_Name` varchar(100) NOT NULL,
  `Tech_Stack` varchar(255) NOT NULL,
  `Designation` varchar(100) DEFAULT NULL,
  `Email` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Mentors`
--

INSERT INTO `Mentors` (`Mentor_Id`, `Mentor_Name`, `Tech_Stack`, `Designation`, `Email`) VALUES
('MENTOR_ESWAR_AI&ML', 'eswar', 'AI&ML', 'ass.prof', 'bhargavanaidujaddu@gmail.com'),
('MENTOR_GIRISHKUMAR_CYBER_SECURITY', 'Girish Kumar ', 'Cyber_Security', 'Ass.Professor', 'girishkumar@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `mentor_assignments`
--

CREATE TABLE `mentor_assignments` (
  `assignment_id` varchar(50) NOT NULL,
  `mentor_id` varchar(50) NOT NULL,
  `team_id` varchar(50) NOT NULL,
  `assigned_by` varchar(50) DEFAULT NULL,
  `assigned_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mentor_assignments`
--

INSERT INTO `mentor_assignments` (`assignment_id`, `mentor_id`, `team_id`, `assigned_by`, `assigned_at`) VALUES
('MA-MEN-BHA-mhvlenya', 'MENTOR_GIRISHKUMAR_CYBER_SECURITY', 'BHA-A3-26022', 'BHA-A3-24160', '2025-11-12 11:31:57');

-- --------------------------------------------------------

--
-- Table structure for table `mentor_requests`
--

CREATE TABLE `mentor_requests` (
  `request_id` varchar(50) NOT NULL,
  `team_id` varchar(50) NOT NULL,
  `message` text DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mentor_requests`
--

INSERT INTO `mentor_requests` (`request_id`, `team_id`, `message`, `status`, `created_at`, `updated_at`) VALUES
('REQ-BHA-A3-26022-20251110-7153', 'BHA-A3-26022', 'Checking', 'Approved', '2025-11-10 11:39:26', '2025-11-12 11:31:57');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `teamId` varchar(50) NOT NULL,
  `members` int(11) NOT NULL,
  `teamname` varchar(255) NOT NULL,
  `collegeName` varchar(255) NOT NULL,
  `stateName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `verified` tinyint(1) DEFAULT 0,
  `abstract_submitted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`teamId`, `members`, `teamname`, `collegeName`, `stateName`, `email`, `password`, `role`, `created_at`, `verified`, `abstract_submitted`) VALUES
('BHA-A3-26022', 4, 'Bhargav', 'Aitam', 'Andhra Pradesh', 'bhargavlovely3383@gmail.com', '$2b$10$akGJiJZM7.FCM47GmrH6HuqZwmX0d1NgZBUSvXyDE.E3Q5OJV29Be', 'Team', '2025-10-21 04:54:20', 1, 1),
('KRA-A3-52661', 2, 'Kranthi Kiran', 'Aditya Institute of Technology and Managment', 'Andhra Pradesh', 'kelamkranthikiran@gmail.com', '$2b$10$4crWDEUnxGz9rGboSDFrDeS9L9whVstv9OaO8xayTYjGLLhf.GJ56', 'Team', '2025-11-10 09:52:21', 1, 1),
('PRA-A3-82704', 2, 'prasanth', 'aitam', 'Andaman and Nicobar Islands', 'prasanthpadma4@gmail.com', '$2b$10$yt07vOeXkjblZAiexEW8OOnjg5yper/fYBfAH/XoKblasd.QsYMRC', 'Team', '2025-10-31 07:11:58', 1, 0),
('T.P-A3-67868', 2, 't.prasanth', 'aitam', 'Assam', 'thonangiprasanthkumar@gmail.com', '$2b$10$AWDatPkLKePD/0mBxVUVOOJQLIAFR30CRY6Y0A3KsWCyhMEhBrugC', 'Team', '2025-11-01 09:58:38', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `memberId` int(11) NOT NULL,
  `teamId` varchar(50) NOT NULL,
  `member_name` varchar(100) NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `email_id` varchar(100) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_members`
--

INSERT INTO `team_members` (`memberId`, `teamId`, `member_name`, `role`, `phone_number`, `email_id`, `photo`, `gender`, `created_at`, `updated_at`) VALUES
(10, 'BHA-A3-26022', 'Bhargav Naidu', 'Team Lead', '9347442677', 'bhargavanaidujaddu@gmail.com', '/uploads/members/1761800174546-134402414.JPG', 'Male', '2025-10-30 04:56:14', '2025-10-31 04:48:26'),
(11, 'BHA-A3-26022', 'Prasanth', 'Team Member', '9347442677', 'prasanth@gmail.com', '/uploads/members/1761800340737-313832490.jpeg', 'Male', '2025-10-30 04:59:00', '2025-10-30 04:59:00'),
(12, 'BHA-A3-26022', 'Kamal', 'Team Member', '9347442677', 'kamal@gmail.com', '/uploads/members/1761800477665-785340277.JPG', 'Male', '2025-10-30 05:01:17', '2025-10-30 05:01:17'),
(16, 'BHA-A3-26022', 'Kranthi Kiran Kelam', 'Team Member', '9347442677', 'kranthikirankelam@gmail.com', '/uploads/members/1761889545143-690171490.jpg', 'Male', '2025-10-31 05:45:45', '2025-10-31 05:45:45'),
(17, 'PRA-A3-82704', 'pandu', 'Team Lead', '1234567890', 'ppp@gmail.com', '/uploads/members/1761894869360-886073182.JPG', 'Male', '2025-10-31 07:14:29', '2025-10-31 07:14:29'),
(18, 'PRA-A3-82704', 'prasanth', 'Team Member', '0987654321', 'pp@gmail.com', '/uploads/members/1761894926452-499258760.JPG', 'Male', '2025-10-31 07:15:26', '2025-10-31 07:15:26'),
(19, 'T.P-A3-67868', 'Thonangi prasanth kumar', 'Team Lead', '9059518937', 'thonangiprasanthkumar@gmail.com', '/uploads/members/1761991334144-583204690.JPG', 'Male', '2025-11-01 10:02:14', '2025-11-01 10:02:14'),
(20, 'T.P-A3-67868', 'bhargav naidu', 'Team Member', '1234567890', 'bhargavnaidu@gmail.com', '/uploads/members/1761991373441-38286532.JPG', 'Male', '2025-11-01 10:02:53', '2025-11-01 10:02:53'),
(21, 'KRA-A3-52661', 'Kranthi Kiran Kelam', 'Team Lead', '7586759626', 'kelamkranthikiran@gmail.com', '/uploads/members/1762768619371-675859351.png', 'Male', '2025-11-10 09:56:59', '2025-11-10 09:56:59'),
(22, 'KRA-A3-52661', 'Harshitha', 'Team Member', '7586758626', 'hrarshitha@gmail.com', '/uploads/members/1762768712795-516122454.jpg', 'Female', '2025-11-10 09:58:32', '2025-11-10 09:58:32');

-- --------------------------------------------------------

--
-- Table structure for table `team_otp`
--

CREATE TABLE `team_otp` (
  `id` int(11) NOT NULL,
  `teamId` varchar(50) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `otp_expiry` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `abstract_draft_submissions`
--
ALTER TABLE `abstract_draft_submissions`
  ADD PRIMARY KEY (`draft_id`),
  ADD KEY `fk_team_draft` (`team_id`);

--
-- Indexes for table `abstract_results`
--
ALTER TABLE `abstract_results`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `fk_abstract_results_team` (`team_id`),
  ADD KEY `fk_abstract_results_abstract` (`abstract_id`),
  ADD KEY `fk_abstract_results_admin` (`evaluated_by`);

--
-- Indexes for table `abstract_submissions`
--
ALTER TABLE `abstract_submissions`
  ADD PRIMARY KEY (`abstract_id`),
  ADD KEY `fk_team` (`team_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`AdminId`),
  ADD UNIQUE KEY `Email` (`email`);

--
-- Indexes for table `Mentors`
--
ALTER TABLE `Mentors`
  ADD PRIMARY KEY (`Mentor_Id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `mentor_assignments`
--
ALTER TABLE `mentor_assignments`
  ADD PRIMARY KEY (`assignment_id`),
  ADD KEY `mentor_id` (`mentor_id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `assigned_by` (`assigned_by`);

--
-- Indexes for table `mentor_requests`
--
ALTER TABLE `mentor_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`teamId`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `teamId` (`teamId`);

--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`memberId`),
  ADD KEY `teamId` (`teamId`);

--
-- Indexes for table `team_otp`
--
ALTER TABLE `team_otp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_team_id` (`teamId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `team_members`
--
ALTER TABLE `team_members`
  MODIFY `memberId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `team_otp`
--
ALTER TABLE `team_otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `abstract_draft_submissions`
--
ALTER TABLE `abstract_draft_submissions`
  ADD CONSTRAINT `fk_team_draft` FOREIGN KEY (`team_id`) REFERENCES `teams` (`teamId`) ON DELETE CASCADE;

--
-- Constraints for table `abstract_results`
--
ALTER TABLE `abstract_results`
  ADD CONSTRAINT `fk_abstract_results_abstract` FOREIGN KEY (`abstract_id`) REFERENCES `abstract_submissions` (`abstract_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_abstract_results_admin` FOREIGN KEY (`evaluated_by`) REFERENCES `admin` (`AdminId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_abstract_results_team` FOREIGN KEY (`team_id`) REFERENCES `teams` (`teamId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `abstract_submissions`
--
ALTER TABLE `abstract_submissions`
  ADD CONSTRAINT `fk_team` FOREIGN KEY (`team_id`) REFERENCES `teams` (`teamId`) ON DELETE CASCADE;

--
-- Constraints for table `mentor_assignments`
--
ALTER TABLE `mentor_assignments`
  ADD CONSTRAINT `mentor_assignments_ibfk_1` FOREIGN KEY (`mentor_id`) REFERENCES `Mentors` (`Mentor_Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `mentor_assignments_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`teamId`) ON DELETE CASCADE,
  ADD CONSTRAINT `mentor_assignments_ibfk_3` FOREIGN KEY (`assigned_by`) REFERENCES `admin` (`AdminId`) ON DELETE SET NULL;

--
-- Constraints for table `mentor_requests`
--
ALTER TABLE `mentor_requests`
  ADD CONSTRAINT `mentor_requests_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`teamId`) ON DELETE CASCADE;

--
-- Constraints for table `team_members`
--
ALTER TABLE `team_members`
  ADD CONSTRAINT `team_members_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `teams` (`teamId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `team_otp`
--
ALTER TABLE `team_otp`
  ADD CONSTRAINT `fk_team_id` FOREIGN KEY (`teamId`) REFERENCES `teams` (`teamId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
