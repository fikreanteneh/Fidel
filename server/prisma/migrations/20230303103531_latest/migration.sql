-- DropIndex
DROP INDEX `Admin_user_id_fkey` ON `admin`;

-- DropIndex
DROP INDEX `Enrollment_class_id_fkey` ON `enrollment`;

-- DropIndex
DROP INDEX `Enrollment_user_id_fkey` ON `enrollment`;

-- DropIndex
DROP INDEX `Result_user_id_fkey` ON `result`;

-- DropIndex
DROP INDEX `Subject_Teacher_id_fkey` ON `subject`;

-- DropIndex
DROP INDEX `Subject_class_id_fkey` ON `subject`;

-- AddForeignKey
ALTER TABLE `Account_detail` ADD CONSTRAINT `Account_detail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Account`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Account`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GuardianInfo` ADD CONSTRAINT `GuardianInfo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Account`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeacherDetail` ADD CONSTRAINT `TeacherDetail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Account`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_Teacher_id_fkey` FOREIGN KEY (`Teacher_id`) REFERENCES `Account`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Classes`(`class_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Account`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Classes`(`class_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Account`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Account`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
