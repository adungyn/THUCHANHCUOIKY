/**
 * ProjectData.java
 * Lớp này mô phỏng cấu trúc dữ liệu cho dự án Nhím Tập Gieo.
 * Nó có thể được sử dụng trong môi trường backend (server) để quản lý
 * thông tin chi tiết về các mùa dự án, thành viên, và giáo án.
 */
public class ProjectData {

    private String projectName;
    private String projectPhase;
    private int totalMembers;

    // Constructor
    public ProjectData(String projectName, String projectPhase, int totalMembers) {
        this.projectName = projectName;
        this.projectPhase = projectPhase;
        this.totalMembers = totalMembers;
    }

    // Phương thức Getter
    public String getProjectName() {
        return projectName;
    }

    public String getProjectPhase() {
        return projectPhase;
    }

    public int getTotalMembers() {
        return totalMembers;
    }

    // Phương thức mô phỏng in thông tin
    public void printProjectSummary() {
        System.out.println("--- Tổng quan Dự án ---");
        System.out.println("Tên dự án: " + projectName);
        System.out.println("Giai đoạn: " + projectPhase);
        System.out.println("Số thành viên: " + totalMembers);
    }

    // Phương thức Main để chạy thử (Test)
    public static void main(String[] args) {
        ProjectData nhimTapGieo = new ProjectData("Nhím Tập Gieo", "Mùa 2: STEM", 26);
        nhimTapGieo.printProjectSummary();
    }
}